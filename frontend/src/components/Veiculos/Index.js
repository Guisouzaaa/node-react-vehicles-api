import React from 'react';
import './style.css';

export default function Index({ veiculo, showDetails }) {
    return (
        <div className="veiculo">
            <div>
                <h3>{veiculo.brand}</h3>
                <p>{veiculo.vehicle}</p>
                <span>{veiculo.year}</span>
            </div>
            <i className="fas fa-tag" value={veiculo.cod_fipe} onClick={(e) => showDetails(e)}></i>
        </div>

    )
}
