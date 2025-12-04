import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, Eye, Car, Bike, X } from 'lucide-react';
import { vehicleService } from '../services/vehicleService';
import VehicleForm from './VehicleForm';

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        tipo: '',
        modelo: '',
        cor: '',
        ano: ''
    });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [viewingVehicle, setViewingVehicle] = useState(null);

    const fetchVehicles = async () => {
        try {
            setLoading(true);
            const data = await vehicleService.getAll(filters);
            setVehicles(data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, [filters.tipo]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchVehicles();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este veículo?')) {
            try {
                await vehicleService.delete(id);
                fetchVehicles();
            } catch (error) {
                console.error('Error deleting vehicle:', error);
            }
        }
    };

    const handleEdit = (vehicle) => {
        setEditingVehicle(vehicle);
        setIsFormOpen(true);
    };

    const handleFormSubmit = async (data) => {
        try {
            if (editingVehicle) {
                await vehicleService.update(editingVehicle.id, data);
            } else {
                await vehicleService.create(data);
            }
            setIsFormOpen(false);
            setEditingVehicle(null);
            fetchVehicles();
        } catch (error) {
            console.error('Error saving vehicle:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 font-sans text-gray-800">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-in slide-in-from-top-4 duration-500">
                    <div>
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
                            Veículos SergipeTec
                        </h1>
                    </div>
                    <button
                        onClick={() => {
                            setEditingVehicle(null);
                            setIsFormOpen(true);
                        }}
                        className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 font-semibold"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        Novo Veículo
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 animate-in slide-in-from-bottom-4 duration-500 delay-100">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-600 ml-1">Tipo</label>
                            <div className="relative group">
                                <select
                                    name="tipo"
                                    value={filters.tipo}
                                    onChange={handleFilterChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 appearance-none cursor-pointer hover:border-blue-300"
                                >
                                    <option value="">Todos os Tipos</option>
                                    <option value="CARRO">Carro</option>
                                    <option value="MOTO">Moto</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-blue-500 transition-colors">
                                    <Filter size={16} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-600 ml-1">Modelo</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="modelo"
                                    value={filters.modelo}
                                    onChange={handleFilterChange}
                                    placeholder="Buscar modelo..."
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 hover:border-blue-300"
                                />
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-600 ml-1">Cor</label>
                            <input
                                type="text"
                                name="cor"
                                value={filters.cor}
                                onChange={handleFilterChange}
                                placeholder="Ex: Preto"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 hover:border-blue-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-600 ml-1">Ano</label>
                            <input
                                type="number"
                                name="ano"
                                value={filters.ano}
                                onChange={handleFilterChange}
                                placeholder="Ex: 2023"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 hover:border-blue-300"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20 transition-all duration-300 font-semibold transform active:scale-95"
                        >
                            <Search size={18} />
                            Filtrar
                        </button>
                    </form>
                </div>

                {/* Table */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 overflow-hidden animate-in slide-in-from-bottom-8 duration-500 delay-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/80 border-b border-gray-100">
                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tipo</th>
                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Veículo</th>
                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Detalhes</th>
                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Preço</th>
                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ano</th>
                                    <th className="px-8 py-5 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                                <p className="text-gray-500 font-medium">Carregando veículos...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : vehicles.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center gap-4">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                                    <Car size={32} />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-semibold text-gray-900">Nenhum veículo encontrado</p>
                                                    <p className="text-gray-500">Tente ajustar os filtros ou adicione um novo veículo.</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    vehicles.map((vehicle) => (
                                        <tr key={vehicle.id} className="hover:bg-blue-50/30 transition-colors duration-200 group">
                                            <td className="px-8 py-5 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${vehicle.tipoVeiculo === 'CARRO'
                                                    }`}>
                                                    {vehicle.tipoVeiculo}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 whitespace-nowrap">
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <div className="font-bold text-gray-900 text-base">{vehicle.modelo}</div>
                                                        <div className="text-sm text-gray-500 font-medium">{vehicle.fabricante}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 whitespace-nowrap">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-medium text-gray-700">{vehicle.cor}</span>
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {vehicle.tipoVeiculo === 'CARRO' ? (
                                                            <span>{vehicle.quantPortas} portas • {vehicle.tipoCombustivel}</span>
                                                        ) : (
                                                            <span>{vehicle.cilindrada}cc</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 whitespace-nowrap">
                                                <div className="text-base font-bold text-gray-900">
                                                    R$ {vehicle.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 whitespace-nowrap">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                                    {vehicle.anoFabricacao}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => setViewingVehicle(vehicle)}
                                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                                                        title="Visualizar"
                                                    >
                                                        <Eye size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(vehicle)}
                                                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 hover:scale-110"
                                                        title="Editar"
                                                    >
                                                        <Edit2 size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(vehicle.id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                                                        title="Excluir"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Vehicle Form Modal */}
            <VehicleForm
                isOpen={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    setEditingVehicle(null);
                }}
                onSubmit={handleFormSubmit}
                initialData={editingVehicle}
            />

            {/* View Modal */}
            {viewingVehicle && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex justify-between items-start">
                            <div className="text-white">
                                <h2 className="text-2xl font-bold">{viewingVehicle.modelo}</h2>
                                <p className="text-blue-100">{viewingVehicle.fabricante}</p>
                            </div>
                            <button
                                onClick={() => setViewingVehicle(null)}
                                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors backdrop-blur-sm"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8 -mt-6 bg-white rounded-t-3xl">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tipo</label>
                                    <div className="font-semibold text-gray-900 flex items-center gap-2">
                                        {viewingVehicle.tipoVeiculo}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ano</label>
                                    <div className="font-semibold text-gray-900">{viewingVehicle.anoFabricacao}</div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cor</label>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-900">{viewingVehicle.cor}</span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Preço</label>
                                    <div className="font-bold text-emerald-600 text-lg">
                                        R$ {viewingVehicle.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </div>
                                </div>

                                {viewingVehicle.tipoVeiculo === 'CARRO' && (
                                    <>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Portas</label>
                                            <div className="font-semibold text-gray-900">{viewingVehicle.quantPortas}</div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Combustível</label>
                                            <div className="font-semibold text-gray-900">{viewingVehicle.tipoCombustivel}</div>
                                        </div>
                                    </>
                                )}

                                {viewingVehicle.tipoVeiculo === 'MOTO' && (
                                    <div className="col-span-2 space-y-1">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cilindrada</label>
                                        <div className="font-semibold text-gray-900">{viewingVehicle.cilindrada} cc</div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <button
                                    onClick={() => setViewingVehicle(null)}
                                    className="w-full px-6 py-3 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all font-semibold border border-gray-200"
                                >
                                    Fechar Detalhes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VehicleList;
