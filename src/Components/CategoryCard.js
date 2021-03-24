import { Card } from 'semantic-ui-react'

import { useHistory } from 'react-router-dom'


function CategoryCard({ category }) {
    const history = useHistory();

    const {
        id,
        name
    } = category

    return (
        <Card
            link
            style={{ 'text-align': 'center' }}
            raised
            color='violet'
            header={ name } 
        />
    )
};

export default CategoryCard