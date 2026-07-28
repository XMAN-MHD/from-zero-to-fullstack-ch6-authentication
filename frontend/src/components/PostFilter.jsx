import PropTypes from 'prop-types'

// Composant générique pour filtrer les posts par un champ (ex: author, tag)
export default function PostFilter({ field, value, onChange }) {
  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '.4rem',
        marginBottom: '1rem',
      }}
    >
      {/* Label lié à l'input pour l'accessibilité */}
      <label
        htmlFor={`filter-${field}`}
        style={{
          fontWeight: '600',
          color: '#333',
          textTransform: 'capitalize',
        }}
      >
        {field}
      </label>

      {/* Champ de saisie contrôlé */}
      <input
        type="text"
        name={`filter-${field}`}
        id={`filter-${field}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Filter by ${field}...`}
        style={{
          padding: '.8rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          fontSize: '1rem',
          outline: 'none',
          transition: 'all .2s ease',
        }}
      />
    </div>
  )
}

// Définition des types attendus pour les props du composant
PostFilter.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}