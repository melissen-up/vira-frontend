import { Card, Container, Header } from 'semantic-ui-react'

import CategoryCard from './CategoryCard'

function CategoryContainer({ catData, handleCategoryClick }) {

    const categories = []
    const catCard = catData.map((category) => {
        return <CategoryCard key={category.id} category={category} onClick={() => handleCategoryClick(category.id)} />
    })

    // const CardExampleGroupCentered = () => <Card.Group centered items={items} />

    return (
        <Container style={{ margin: '50px'}}>
            <Header as='h2'>Pose Categories</Header>
            <Card.Group centered itemsPerRow={5}>
                {catCard}
            </Card.Group>
        </Container>

    );
};

export default CategoryContainer