import React, { useState } from 'react';

export default function Orders() {
  const [cliente, setCliente] = useState({ nombre: '', dni: '', telefono: '', email: '' });
  const [reparacion, setReparacion] = useState({
    marca: '', modelo: '', patente: '', kilometraje: '',
    numeroSerie: '', accesorios: '', problema: ''
  });

  const [item, setItem] = useState({
    descripcion: '', precio: '', cantidad: '', descuento: '', iva: ''
  });

  const [items, setItems] = useState([]);

  const agregarItem = () => {
    const precio = parseFloat(item.precio) || 0;
    const cantidad = parseInt(item.cantidad) || 0;
    const descuento = parseFloat(item.descuento) || 0;
    const iva = parseFloat(item.iva) || 0;

    const subtotal = precio * cantidad;
    const desc = subtotal * (descuento / 100);
    const conIVA = (subtotal - desc) * (iva / 100);
    const total = subtotal - desc + conIVA;

    const nuevoItem = {
      ...item,
      precioFinal: (subtotal - desc).toFixed(2),
      total: total.toFixed(2)
    };

    setItems([...items, nuevoItem]);
    setItem({ descripcion: '', precio: '', cantidad: '', descuento: '', iva: '' });
  };

  const guardarOrden = () => {
    const ordenCompleta = {
      id: Date.now(),
      fecha: new Date().toLocaleString(),
      cliente,
      reparacion,
      items
    };

    const prev = JSON.parse(localStorage.getItem("ordenes")) || [];
    prev.push(ordenCompleta);
    localStorage.setItem("ordenes", JSON.stringify(prev));

    setCliente({ nombre: '', dni: '', telefono: '', email: '' });
    setReparacion({
      marca: '', modelo: '', patente: '', kilometraje: '',
      numeroSerie: '', accesorios: '', problema: ''
    });
    setItems([]);
    setItem({ descripcion: '', precio: '', cantidad: '', descuento: '', iva: '' });

    alert("Orden guardada correctamente.");
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4 text-cyan-400">Nueva Orden de Reparación</h1>

      <section>
        <h2 className="text-cyan-400 font-semibold mb-2">Datos del Cliente</h2>
        <input type="text" placeholder="Nombre y Apellido" className="input" value={cliente.nombre} onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })} />
        <input type="text" placeholder="DNI" className="input" value={cliente.dni} onChange={(e) => setCliente({ ...cliente, dni: e.target.value })} />
        <input type="text" placeholder="Teléfono" className="input" value={cliente.telefono} onChange={(e) => setCliente({ ...cliente, telefono: e.target.value })} />
        <input type="email" placeholder="Correo Electrónico" className="input" value={cliente.email} onChange={(e) => setCliente({ ...cliente, email: e.target.value })} />
      </section>

      <section className="mt-6">
        <h2 className="text-cyan-400 font-semibold mb-2">Datos de la Reparación</h2>
        <input type="text" placeholder="Marca" className="input" value={reparacion.marca} onChange={(e) => setReparacion({ ...reparacion, marca: e.target.value })} />
        <input type="text" placeholder="Modelo" className="input" value={reparacion.modelo} onChange={(e) => setReparacion({ ...reparacion, modelo: e.target.value })} />
        <input type="text" placeholder="Patente" className="input" value={reparacion.patente} onChange={(e) => setReparacion({ ...reparacion, patente: e.target.value })} />
        <input type="text" placeholder="Kilometraje" className="input" value={reparacion.kilometraje} onChange={(e) => setReparacion({ ...reparacion, kilometraje: e.target.value })} />
        <input type="text" placeholder="Número de Serie" className="input" value={reparacion.numeroSerie} onChange={(e) => setReparacion({ ...reparacion, numeroSerie: e.target.value })} />
        <input type="text" placeholder="Accesorios Recepcionados" className="input" value={reparacion.accesorios} onChange={(e) => setReparacion({ ...reparacion, accesorios: e.target.value })} />
        <textarea placeholder="Problema indicado por el cliente" className="input" value={reparacion.problema} onChange={(e) => setReparacion({ ...reparacion, problema: e.target.value })} />
      </section>

      <section className="mt-6">
        <h2 className="text-cyan-400 font-semibold mb-2">Productos / Servicios Aplicados</h2>
        <input type="text" placeholder="Descripción" className="input" value={item.descripcion} onChange={(e) => setItem({ ...item, descripcion: e.target.value })} />
        <input type="number" placeholder="P. Unit" className="input" value={item.precio} onChange={(e) => setItem({ ...item, precio: e.target.value })} />
        <input type="number" placeholder="Cant" className="input" value={item.cantidad} onChange={(e) => setItem({ ...item, cantidad: e.target.value })} />
        <input type="number" placeholder="%Desc" className="input" value={item.descuento} onChange={(e) => setItem({ ...item, descuento: e.target.value })} />
        <input type="number" placeholder="IVA %" className="input" value={item.iva} onChange={(e) => setItem({ ...item, iva: e.target.value })} />

        <button onClick={agregarItem} className="mt-2 bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700">Agregar Ítem</button>
      </section>

      {items.length > 0 && (
        <section className="mt-4">
          <h3 className="text-cyan-300 font-bold mb-2">Ítems Agregados</h3>
          <ul className="bg-slate-800 p-2 rounded">
            {items.map((i, idx) => (
              <li key={idx} className="border-b border-slate-600 p-2">
                {i.descripcion} - {i.cantidad} x ${i.precio} = <strong>${i.total}</strong>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="text-right mt-6">
        <button onClick={guardarOrden} className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700">Guardar Orden</button>
      </div>
    </div>
  );
}
