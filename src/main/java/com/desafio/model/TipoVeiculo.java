package com.desafio.model;

public enum TipoVeiculo {
    CARRO("Carro"),
    MOTO("Moto");

    private final String displayName;

    TipoVeiculo(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }
}
