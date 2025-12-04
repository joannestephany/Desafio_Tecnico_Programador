package com.desafio.model;

public enum TipoCombustivel {
    GASOLINA("Gasolina"),
    ETANOL("Etanol"),
    DIESEL("Diesel"),
    FLEX("Flex");

    private final String displayName;

    TipoCombustivel(String displayName) {
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
