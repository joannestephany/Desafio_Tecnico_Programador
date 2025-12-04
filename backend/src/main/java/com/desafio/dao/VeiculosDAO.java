package com.desafio.dao;

import com.desafio.model.*;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class VeiculosDAO {

    public List<Veiculo> getAll(String tipo, String modelo, String cor, Integer ano) throws SQLException {
        List<Veiculo> veiculos = new ArrayList<>();
        StringBuilder sql = new StringBuilder("SELECT v.*,c.quantidade_portas,c.tipo_combustivel,m.cilindrada " +
                "FROM veiculos v " +
                "LEFT JOIN carros c ON v.id = c.id " +
                "LEFT JOIN motos m ON v.id = m.id WHERE 1=1");

        List<Object> params = new ArrayList<>();

        if (tipo != null && !tipo.isEmpty()) {
            sql.append(" AND v.tipo = ?");
            params.add(tipo);
        }
        if (modelo != null && !modelo.isEmpty()) {
            sql.append(" AND v.modelo LIKE ?");
            params.add("%" + modelo + "%");
        }
        if (cor != null && !cor.isEmpty()) {
            sql.append(" AND v.cor = ?");
            params.add(cor);
        }
        if (ano != null) {
            sql.append(" AND v.ano_fab = ?");
            params.add(ano);
        }

        try (Connection con = DatabaseConnection.getConnection();
                PreparedStatement stmt = con.prepareStatement(sql.toString())) {
            for (int i = 0; i < params.size(); i++) {
                stmt.setObject(i + 1, params.get(i));
            }

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    veiculos.add(mapResultToVeiculo(rs));
                }
            }
        }

        return veiculos;
    }

    private Veiculo mapResultToVeiculo(ResultSet rs) throws SQLException {
        String tipoVeiculo = rs.getString("tipo");
        TipoVeiculo tipoVeiculoObj = tipoVeiculo != null ? TipoVeiculo.valueOf(tipoVeiculo) : null;

        String tipoCombusticelstr = rs.getString("tipo_combustivel");
        TipoCombustivel tipoCombustivel = tipoCombusticelstr != null ? TipoCombustivel.valueOf(tipoCombusticelstr)
                : null;

        if (tipoVeiculo.equals("CARRO")) {
            return new Carro(
                    rs.getInt("id"),
                    rs.getString("modelo"),
                    rs.getString("fabricante"),
                    rs.getInt("ano_fab"),
                    rs.getBigDecimal("preco"),
                    tipoVeiculoObj,
                    rs.getString("cor"),
                    rs.getInt("quantidade_portas"),
                    tipoCombustivel);
        } else {
            return new Moto(
                    rs.getInt("id"),
                    rs.getString("modelo"),
                    rs.getString("fabricante"),
                    rs.getInt("ano_fab"),
                    rs.getBigDecimal("preco"),
                    tipoVeiculoObj,
                    rs.getString("cor"),
                    rs.getInt("cilindrada"));
        }
    }

    public Veiculo getById(int id) throws SQLException {
        String sql = "SELECT v.id, v.modelo, v.fabricante, v.ano_fab, v.preco, v.tipo, v.cor, " +
                "c.quantidade_portas, c.tipo_combustivel, m.cilindrada " +
                "FROM veiculos v " +
                "LEFT JOIN carros c ON v.id = c.id " +
                "LEFT JOIN motos m ON v.id = m.id " +
                "WHERE v.id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return mapResultToVeiculo(rs);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    public Veiculo createVeiculo(Veiculo veiculo) throws SQLException {
        String sqlVeiculo = "INSERT INTO veiculos (modelo, fabricante, ano_fab, preco, tipo, cor) VALUES (?, ?, ?, ?, ?, ?)";
        String sqlEspecifico;

        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement stmtVeiculo = conn.prepareStatement(sqlVeiculo, Statement.RETURN_GENERATED_KEYS)) {

            conn.setAutoCommit(false);

            try {
                stmtVeiculo.setString(1, veiculo.getModelo());
                stmtVeiculo.setString(2, veiculo.getFabricante());
                stmtVeiculo.setInt(3, veiculo.getAnoFabricacao());
                stmtVeiculo.setBigDecimal(4, veiculo.getPreco());
                stmtVeiculo.setString(5, veiculo.getTipoVeiculo().toString());
                stmtVeiculo.setString(6, veiculo.getCor());

                int affectedRows = stmtVeiculo.executeUpdate();
                if (affectedRows == 0) {
                    throw new SQLException("Falha ao criar veículo, nenhuma linha afetada.");
                }

                try (ResultSet generatedKeys = stmtVeiculo.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        int veiculoId = generatedKeys.getInt(1);
                        veiculo.setId(veiculoId);

                        if (veiculo instanceof Carro) {
                            Carro carro = (Carro) veiculo;
                            sqlEspecifico = "INSERT INTO carros (id, quantidade_portas, tipo_combustivel) VALUES (?, ?, ?)";
                            try (PreparedStatement stmtCarro = conn.prepareStatement(sqlEspecifico)) {
                                stmtCarro.setInt(1, veiculoId);
                                stmtCarro.setInt(2, carro.getQuantPortas());
                                stmtCarro.setString(3, carro.getTipoCombustivel().toString());
                                stmtCarro.executeUpdate();
                            }
                        } else if (veiculo instanceof Moto) {
                            Moto moto = (Moto) veiculo;
                            sqlEspecifico = "INSERT INTO motos (id, cilindrada) VALUES (?, ?)";
                            try (PreparedStatement stmtMoto = conn.prepareStatement(sqlEspecifico)) {
                                stmtMoto.setInt(1, veiculoId);
                                stmtMoto.setInt(2, moto.getCilindrada());
                                stmtMoto.executeUpdate();
                            }
                        }

                        conn.commit();
                        return veiculo;

                    } else {
                        throw new SQLException("Falha ao obter ID do veículo criado.");
                    }
                }
            } catch (SQLException e) {
                conn.rollback();
                throw e;
            } finally {
                conn.setAutoCommit(true);
            }
        }
    }

    public boolean delete(int id) throws SQLException {
        String sqlDeleteVeiculo = "DELETE FROM veiculos WHERE id = ?";
        String sqlDeleteCarro = "DELETE FROM carros WHERE id = ?";
        String sqlDeleteMoto = "DELETE FROM motos WHERE id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement stmtDeleteVeiculo = conn.prepareStatement(sqlDeleteVeiculo);
                PreparedStatement stmtDeleteCarro = conn.prepareStatement(sqlDeleteCarro);
                PreparedStatement stmtDeleteMoto = conn.prepareStatement(sqlDeleteMoto)) {

            conn.setAutoCommit(false);

            try {
                stmtDeleteCarro.setInt(1, id);
                stmtDeleteCarro.executeUpdate();

                stmtDeleteMoto.setInt(1, id);
                stmtDeleteMoto.executeUpdate();

                stmtDeleteVeiculo.setInt(1, id);
                int rowsAffected = stmtDeleteVeiculo.executeUpdate();

                if (rowsAffected > 0) {
                    conn.commit();
                    return true;
                } else {
                    conn.rollback();
                    return false;
                }
            } catch (SQLException e) {
                conn.rollback();
                throw e;
            } finally {
                conn.setAutoCommit(true);
            }
        }
    }

    public Veiculo update(Veiculo veiculo) throws SQLException {
        String sqlUpdateVeiculo = "UPDATE veiculos SET modelo = ?, fabricante = ?, ano_fab = ?, preco = ?, cor = ? WHERE id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement stmtVeiculo = conn.prepareStatement(sqlUpdateVeiculo)) {

            conn.setAutoCommit(false);

            try {
                stmtVeiculo.setString(1, veiculo.getModelo());
                stmtVeiculo.setString(2, veiculo.getFabricante());
                stmtVeiculo.setInt(3, veiculo.getAnoFabricacao());
                stmtVeiculo.setBigDecimal(4, veiculo.getPreco());
                stmtVeiculo.setString(5, veiculo.getCor());
                stmtVeiculo.setInt(6, veiculo.getId());

                int rowsAffected = stmtVeiculo.executeUpdate();

                if (rowsAffected == 0) {
                    conn.rollback();
                    return null;
                }

                if (veiculo instanceof Carro) {
                    Carro carro = (Carro) veiculo;
                    String sqlUpdateCarro = "UPDATE carros SET quantidade_portas = ?, tipo_combustivel = ? WHERE id = ?";
                    try (PreparedStatement stmtCarro = conn.prepareStatement(sqlUpdateCarro)) {
                        stmtCarro.setInt(1, carro.getQuantPortas());
                        stmtCarro.setString(2, carro.getTipoCombustivel().toString());
                        stmtCarro.setInt(3, veiculo.getId()); // TODO: Entender o pq esse getID nao funciona
                        stmtCarro.executeUpdate();
                    }
                } else if (veiculo instanceof Moto) {
                    Moto moto = (Moto) veiculo;
                    String sqlUpdateMoto = "UPDATE motos SET cilindrada = ? WHERE id = ?";
                    try (PreparedStatement stmtMoto = conn.prepareStatement(sqlUpdateMoto)) {
                        stmtMoto.setInt(1, moto.getCilindrada());
                        stmtMoto.setInt(2, veiculo.getId());
                        stmtMoto.executeUpdate();
                    }
                }

                conn.commit(); // Confirma a transação
                return veiculo;

            } catch (SQLException e) {
                conn.rollback(); // Desfaz em caso de erro
                throw e;
            } finally {
                conn.setAutoCommit(true);
            }
        }
    }

}
