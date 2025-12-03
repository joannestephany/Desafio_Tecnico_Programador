package com.desafio.model;

import java.math.BigDecimal;

public class Carro extends Veiculo {
    private Integer quantPortas;
    private TipoCombustivel tipoCombustivel;

    public Carro() {}

    public Carro(Integer id, String modelo, String fabricante, Integer anoFabricacao, BigDecimal preco, TipoVeiculo tipoVeiculo, String cor, Integer quantPortas, TipoCombustivel tipoCombustivel) {
        super(id,modelo,fabricante,anoFabricacao,preco,tipoVeiculo,cor);
        this.quantPortas = quantPortas;
        this.tipoCombustivel = tipoCombustivel;
    }

    public Integer getQuantPortas() {return quantPortas;}
    public void setQuantPortas(Integer quantPortas) {
        this.quantPortas = quantPortas;
    }

    public TipoCombustivel getTipoCombustivel() {return tipoCombustivel;}
    public void setTipoCombustivel(TipoCombustivel tipoCombustivel) {
        this.tipoCombustivel = tipoCombustivel;
    }

}
