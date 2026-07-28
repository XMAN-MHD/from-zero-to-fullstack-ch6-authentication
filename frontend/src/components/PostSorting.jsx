import React from 'react'
import PropTypes from 'prop-types'

// Composant pour choisir le champ et l'ordre de tri des posts
export default function PostSorting({
  fields = [], // Liste des champs disponibles pour le tri (ex: ['createdAt', 'updatedAt'])
  value, // Champ actuellement sélectionné pour le tri
  onChange, // Fonction appelée quand on change le champ de tri
  orderValue, // Ordre de tri actuellement sélectionné ('ascending' ou 'descending')
  onOrderChange, // Fonction appelée quand on change l'ordre de tri
}) {
  return (
    <div>
      {/* Sélecteur du champ de tri */}
      <label htmlFor='sortBy'>Sort By: </label>
      <select
        name='sortBy'
        id='sortBy'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {/* Génère une option pour chaque champ de tri */}
        {fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      {' / '}
      {/* Sélecteur de l'ordre de tri */}
      <label htmlFor='sortOrder'>Sort Order: </label>
      <select
        name='sortOrder'
        id='sortOrder'
        value={orderValue}
        onChange={(e) => onOrderChange(e.target.value)}
      >
        <option value={'ascending'}>ascending</option>
        <option value={'descending'}>descending</option>
      </select>
    </div>
  )
}

// Définition des types attendus pour les props du composant
PostSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired, // Liste des champs de tri
  value: PropTypes.string.isRequired, // Champ sélectionné
  onChange: PropTypes.func.isRequired, // Callback pour le champ de tri
  orderValue: PropTypes.string.isRequired, // Ordre sélectionné
  onOrderChange: PropTypes.func.isRequired, // Callback pour l'ordre de tri
}
