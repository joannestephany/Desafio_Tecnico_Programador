package com.desafio.service;

import com.desafio.dao.VeiculosDAO;
import com.desafio.model.Veiculo;

import java.sql.SQLException;
import java.util.List;

public class VeiculoService {
    private final VeiculosDAO veiculosDAO;

    public VeiculoService() {
        this.veiculosDAO = new VeiculosDAO();
    }

    public List<Veiculo> getAll(String tipo, String modelo, String cor, Integer ano) throws Exception {
        return veiculosDAO.getAll(tipo, modelo, cor, ano);
    }

    public Veiculo getById(int id) throws Exception {
        Veiculo veiculo = veiculosDAO.getById(id);
        if (veiculo == null) {
            throw new SQLException("Veículo não encontrado com ID: " + id);
        }
        return veiculo;
    }

    public Veiculo postVeiculo(Veiculo veiculo) throws Exception { // criar veiculo
        return veiculosDAO.createVeiculo(veiculo);
    }

    public boolean delete(int id) throws SQLException {
        // Implementar regras de negócio antes de excluir (se houver)
        return veiculosDAO.delete(id);
    }

    public Veiculo update(Veiculo veiculo) throws SQLException {
        // Implementar regras de negócio/validações antes de atualizar
        if (veiculo.getId() <= 0) {
            throw new IllegalArgumentException("ID do veículo deve ser válido para atualização.");
        }
        return veiculosDAO.update(veiculo);
    }

}
