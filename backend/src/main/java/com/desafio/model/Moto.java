package com.desafio.model;

import java.math.BigDecimal;

public class Moto extends Veiculo{
    private Integer cilindrada;

    public Moto(){}

    public Moto(Integer id, String modelo, String fabricante, Integer anoFabricacao, BigDecimal preco, TipoVeiculo tipoVeiculo, String cor, Integer cilindrada){
        super(id,modelo,fabricante,anoFabricacao,preco,tipoVeiculo,cor);
        this.cilindrada = cilindrada;
    }

    public Integer getCilindrada() { return cilindrada; }
    public void setCilindrada(Integer cilindrada) {
        this.cilindrada = cilindrada;
    }
}
