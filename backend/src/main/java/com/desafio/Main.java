package com.desafio;
import com.desafio.controller.VeiculoController;
import com.desafio.model.Carro;
import io.javalin.Javalin;
//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {

    public static void main(String[] args) {
        Javalin app = Javalin.create(config -> {
            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(it -> {
                    it.anyHost();
                });
            });
        }).start(7001);

        VeiculoController veiculoController = new VeiculoController();

        app.get("/veiculos", veiculoController::getAll);
        app.get("/veiculos/{id}", veiculoController::getById);
        app.post("/veiculos", veiculoController::post);
        app.put("/veiculos/{id}", veiculoController::put);
        app.delete("/veiculos/{id}", veiculoController::delete);
    }
}