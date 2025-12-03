package com.desafio.model;

import java.math.BigDecimal;

public abstract class Veiculo {
    private Integer id;
    private String modelo;
    private String fabricante;
    private Integer anoFabricacao;
    private BigDecimal preco;
    private TipoVeiculo tipoVeiculo;
    private String cor;

    public Veiculo() {}

    public Veiculo(Integer id, String modelo, String fabricante, Integer anoFabricacao, BigDecimal preco, TipoVeiculo tipoVeiculo, String cor) {
        this.id = id;
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.anoFabricacao = anoFabricacao;
        this.preco = preco;
        this.tipoVeiculo = tipoVeiculo;
        this.cor = cor;
    }

    public Integer getId(){ return id; }
    public void setId(Integer id) {
        this.id = id;
    }

    public String getModelo(){ return modelo; }
    public void setModelo(String modelo){
        this.modelo = modelo;
    }

    public String getFabricante(){ return fabricante; }
    public void setFabricante(String fabricante){
        this.fabricante = fabricante;
    }

    public Integer getAnoFabricacao(){ return anoFabricacao; }
    public void setAnoFabricacao(Integer anoFabricacao){
        this.anoFabricacao = anoFabricacao;
    }

    public BigDecimal getPreco(){ return preco; }
    public void setPreco(BigDecimal preco){
        this.preco = preco;
    }

    public TipoVeiculo getTipoVeiculo(){ return tipoVeiculo; }
    public void setTipoVeiculo(TipoVeiculo tipoVeiculo){
        this.tipoVeiculo = tipoVeiculo;
    }

    public String getCor(){ return cor; }
    public void setCor(String cor){
        this.cor = cor;
    }


}
