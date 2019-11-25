import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import Veiculos from '../Veiculos/Index';

export default function Index() {
    const [veiculos, setVeiculos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(true);
    const pages = [];
    const limit = 5;

    useEffect(() => {
        async function loadVeiculos() {
            const response = await axios.get(`http://localhost:3333/vehicles?page=${currentPage}&limit=${limit}`);
            setVeiculos(response.data.results);
            setTotalPages(response.data.total);
            setLoading(false);
        }

        loadVeiculos();
    }, [currentPage]);

    function changePage(e) {
        setLoading(true);
        const pages = document.querySelectorAll('.pages');
        
        pages.forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');

        setCurrentPage(e.target.value);
    }

    function resetForm() {
        document.getElementById('veiculo').value = '';
        document.getElementById('marca').value = '';
        document.getElementById('ano').value = '';
    }

    function openModal() {
        resetForm();
        const overlay = document.querySelector('.overlay');

        overlay.style.display = 'flex';
    }

    function closeModal(e) {
        e.preventDefault();
        resetForm();
        const overlay = document.querySelector('.overlay');

        overlay.style.display = 'none';
    }

    async function handleSubmit() {
        const overlay = document.querySelector('.overlay');
        const veiculo = document.getElementById('veiculo').value;
        const marca = document.getElementById('marca').value;
        const descricao = document.getElementById('descricao').value;
        const ano = document.getElementById('ano').value;

        if (!veiculo || !marca || !ano) return;

        try {
            await axios.post('http://localhost:3333/vehicles', {
                vehicle: veiculo,
                brand: marca,
                year: ano,
                description: descricao
            });
        } catch (error) {
            console.log(error);
        }

        overlay.style.display = 'none';
        resetForm();
    }

    function showDetails(e) {
        const detalhes = document.querySelector('.edit-details');
        detalhes.style.display = 'block';

        const veiculo = document.getElementById('det-veiculo')
        const marca = document.getElementById('det-marca')
        const ano = document.getElementById('det-ano')

        const div = e.target.closest('div')

        marca.innerText = div.querySelector('h3').textContent;
        veiculo.innerText = div.querySelector('p').textContent;
        ano.innerText = div.querySelector('span').textContent;
    }


    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            pages.push(<button className="pages active" key={i} value={i} onClick={(e) => changePage(e)}>{i}</button>)
        } else {
            pages.push(<button className="pages" key={i} value={i} onClick={(e) => changePage(e)}>{i}</button>)
        }
    }

    return (
        <>
            <header>
                <nav>
                    <div className="logo">
                        Veiculos
                    </div>
                    <form>
                        <input type="text" placeholder="BUSCA por um veículo" />
                    </form>
                </nav>
            </header>

            <div className="novo-veiculo">
                <h1>VEÍCULO</h1>
                <button onClick={() => openModal()}><span>+</span></button>
            </div>

            <section className="veiculos">
                <div className="lista-veic">
                    <h2>Lista de veículos</h2>
                    {loading ? <h1>Loading...</h1> : veiculos.map(v => (
                        <Veiculos key={v._id} veiculo={v} showDetails={showDetails} />
                    ))}
                    {pages}
                </div>
                <div className="detalhes">
                    <h2>Detalhes</h2>
                    <div className="edit-details">
                        <h1 id="det-veiculo"></h1>
                        <div className="marca-ano">
                            <div>
                                <h4>Marca</h4>
                                <span id="det-marca"></span>
                            </div>
                            <div>
                                <h4>Ano</h4>
                                <span id="det-ano"></span>
                            </div>
                        </div>
                        <div className="description">
                        </div>
                        <div className="edit-buttons">
                            <i className="fas fa-tag"></i>
                        </div>
                    </div>
                </div>
            </section>

            <div className="overlay">
                <div className="veiculo-modal">
                    <h1>Novo Veículo</h1>
                    <form onSubmit={() => handleSubmit()}>
                        <div className="form-veic">
                            <div>
                                <label htmlFor="veiculo">Veículo</label>
                                <input type="text" name="veiculo" id="veiculo" />
                            </div>
                            <div>
                                <label htmlFor="marca">Marca</label>
                                <input type="text" name="marca" id="marca" />
                            </div>
                        </div>
                        <div className="form-ano">
                            <div>
                                <label htmlFor="ano">Ano</label>
                                <input type="number" name="ano" id="ano" />
                            </div>
                            <div>
                                <label htmlFor="vendido">Vendido</label>
                                <input type="checkbox" name="vendido" id="vendido" />
                            </div>
                        </div>
                        <div className="form-desc">
                            <label htmlFor="descricao">Descrição</label>
                            <input type="textarea" name="descricao" id="descricao" />
                        </div>
                        <div className="buttons">
                            <button type="submit">ADD</button>
                            <button onClick={(e) => closeModal(e)}>FECHAR</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
