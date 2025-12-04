import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const VehicleForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
    const [formData, setFormData] = useState({
        tipoVeiculo: 'CARRO',
        modelo: '',
        fabricante: '',
        anoFabricacao: new Date().getFullYear(),
        preco: '',
        cor: '',
        quantPortas: '',
        tipoCombustivel: 'GASOLINA',
        cilindrada: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                tipoVeiculo: 'CARRO',
                modelo: '',
                fabricante: '',
                anoFabricacao: new Date().getFullYear(),
                preco: '',
                cor: '',
                quantPortas: '',
                tipoCombustivel: 'GASOLINA',
                cilindrada: '',
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {initialData ? 'Editar Veículo' : 'Novo Veículo'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Veículo</label>
                            <select
                                name="tipoVeiculo"
                                value={formData.tipoVeiculo}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                disabled={!!initialData}
                            >
                                <option value="CARRO">Carro</option>
                                <option value="MOTO">Moto</option>
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                            <input
                                type="text"
                                name="modelo"
                                value={formData.modelo}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                placeholder="Ex: Civic"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fabricante</label>
                            <input
                                type="text"
                                name="fabricante"
                                value={formData.fabricante}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                placeholder="Ex: Honda"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
                            <input
                                type="number"
                                name="anoFabricacao"
                                value={formData.anoFabricacao}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cor</label>
                            <input
                                type="text"
                                name="cor"
                                value={formData.cor}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                placeholder="Ex: Preto"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
                            <input
                                type="number"
                                name="preco"
                                value={formData.preco}
                                onChange={handleChange}
                                required
                                step="0.01"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                placeholder="0.00"
                            />
                        </div>

                        {formData.tipoVeiculo === 'CARRO' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Portas</label>
                                    <input
                                        type="number"
                                        name="quantPortas"
                                        value={formData.quantPortas}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Combustível</label>
                                    <select
                                        name="tipoCombustivel"
                                        value={formData.tipoCombustivel}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    >
                                        <option value="GASOLINA">Gasolina</option>
                                        <option value="ALCOOL">Álcool</option>
                                        <option value="FLEX">Flex</option>
                                    </select>
                                </div>
                            </>
                        )}

                        {formData.tipoVeiculo === 'MOTO' && (
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cilindrada</label>
                                <input
                                    type="number"
                                    name="cilindrada"
                                    value={formData.cilindrada}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    placeholder="Ex: 500"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-200"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VehicleForm;
