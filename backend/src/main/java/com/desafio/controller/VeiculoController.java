package com.desafio.controller;

import com.desafio.model.*;
import com.desafio.service.VeiculoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import io.javalin.http.HttpStatus;

import java.sql.SQLException;

public class VeiculoController {
    private final VeiculoService veiculoService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public VeiculoController() {
        this.veiculoService = new VeiculoService();
    }

    public void getAll(Context ctx) {
        try {
            String tipo = ctx.queryParam("tipo");
            String modelo = ctx.queryParam("modelo");
            String cor = ctx.queryParam("cor");
            Integer ano = ctx.queryParamAsClass("ano", Integer.class).getOrDefault(null);

            ctx.json(veiculoService.getAll(tipo, modelo, cor, ano));
        } catch (SQLException e) {
            ctx.status(HttpStatus.INTERNAL_SERVER_ERROR).result("Erro ao obter veiculos: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void getById(Context ctx) {
        try {

            int id = ctx.pathParamAsClass("id", Integer.class).get();
            Veiculo veiculo = veiculoService.getById(id);

            if (veiculo != null) {
                ctx.json(veiculo);
            } else {
                ctx.status(HttpStatus.NOT_FOUND).result("Veículo não encontrado com ID: " + id);
            }
        } catch (IllegalArgumentException e) {
            ctx.status(HttpStatus.BAD_REQUEST).result("ID de veículo inválido.");
        } catch (SQLException e) {
            ctx.status(HttpStatus.INTERNAL_SERVER_ERROR).result("Erro ao buscar veículo: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void post(Context ctx) { // salva
        try {
            String jsonBody = ctx.body();
            com.fasterxml.jackson.databind.JsonNode node = objectMapper.readTree(jsonBody);

            if (!node.has("tipoVeiculo")) {
                ctx.status(HttpStatus.BAD_REQUEST).result("O campo tipoVeiculo é obrigatório.");
                return;
            }

            String tipoVeiculoStr = node.get("tipoVeiculo").asText();
            Veiculo veiculoASalvar;

            if (tipoVeiculoStr.equalsIgnoreCase("CARRO")) {
                veiculoASalvar = objectMapper.treeToValue(node, Carro.class);
            } else if (tipoVeiculoStr.equalsIgnoreCase("MOTO")) {
                veiculoASalvar = objectMapper.treeToValue(node, Moto.class);
            } else {
                ctx.status(HttpStatus.BAD_REQUEST).result("Tipo de veículo inválido.");
                return;
            }

            Veiculo novoVeiculo = veiculoService.postVeiculo(veiculoASalvar);

            ctx.status(HttpStatus.CREATED).json(novoVeiculo);

        } catch (SQLException e) {
            ctx.status(HttpStatus.INTERNAL_SERVER_ERROR).result("Erro de SQL: " + e.getMessage());

        } catch (Exception e) {
            ctx.status(HttpStatus.BAD_REQUEST).result("Dados de entrada inválidos: " + e.getMessage());
        }
    }

    public void put(Context ctx) { // atualiza
        try {
            int id = ctx.pathParamAsClass("id", Integer.class).get();
            String jsonBody = ctx.body();
            com.fasterxml.jackson.databind.JsonNode node = objectMapper.readTree(jsonBody);

            if (!node.has("tipoVeiculo")) {
                ctx.status(HttpStatus.BAD_REQUEST).result("O campo tipo de veiculo é obrigatório.");
                return;
            }

            String tipoVeiculoStr = node.get("tipoVeiculo").asText();
            Veiculo veiculoAAtualizar;

            if (tipoVeiculoStr.equalsIgnoreCase("CARRO")) {
                veiculoAAtualizar = objectMapper.treeToValue(node, Carro.class);
            } else if (tipoVeiculoStr.equalsIgnoreCase("MOTO")) {
                veiculoAAtualizar = objectMapper.treeToValue(node, Moto.class);
            } else {
                ctx.status(HttpStatus.BAD_REQUEST).result("Tipo de veículo inválido.");
                return;
            }

            veiculoAAtualizar.setId(id); // garante que o ID do caminho e usado
            Veiculo atualizado = veiculoService.update(veiculoAAtualizar);

            if (atualizado != null) {
                ctx.json(atualizado);
            } else {
                ctx.status(HttpStatus.NOT_FOUND).result("Veículo não encontrado para atualização com ID: " + id);
            }

        } catch (SQLException e) {
            ctx.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .result("Erro de persistência na atualização: " + e.getMessage());
        } catch (Exception e) {
            ctx.status(HttpStatus.BAD_REQUEST).result("Dados de entrada inválidos ou erro: " + e.getMessage());
        }
    }

    public void delete(Context ctx) {
        try {
            int id = ctx.pathParamAsClass("id", Integer.class).get();

            if (veiculoService.delete(id)) { // verifica se existe
                ctx.status(HttpStatus.NO_CONTENT);
            } else {
                ctx.status(HttpStatus.NOT_FOUND).result("Veículo não encontrado para exclusão com ID: " + id);
            }
        } catch (SQLException e) {
            ctx.status(HttpStatus.INTERNAL_SERVER_ERROR).result("Erro ao excluir veículo: " + e.getMessage());
        }
    }

}
