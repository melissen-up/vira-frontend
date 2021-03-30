import { Button } from 'semantic-ui-react'

import { useHistory } from 'react-router-dom'


function CategoryCard({ category, handleCategoryClick }) {
    const history = useHistory();

    const {
        id,
        name
    } = category

    return (
        <Button
            onClick={() => handleCategoryClick(id)}
            style={{ 'text-align': 'center', margin: '5px'  }}
            raised
            color='yellow'
            content={ name } 
        />
    )
};

export default CategoryCard