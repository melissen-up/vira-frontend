import React from 'react'

import {
    Container,
    Grid,
    Header,
    List,
    Segment
} from 'semantic-ui-react'

function Footer() {
    return (
        <>
            <Segment inverted tertiary vertical color='violet' style={{ padding: '2em 0em'}}>
                <Container>
                    <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={3}>
                        <Header inverted as='h4' content='Project' />
                        <List link inverted>
                            <List.Item as='a'>Project</List.Item>
                            <List.Item as='a'>Repos</List.Item>
                            <List.Item as='a'>Credits</List.Item>
                        </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                        <Header inverted as='h4' content='Creator' />
                        <List link inverted>
                            <List.Item as='a'>GitHub</List.Item>
                            <List.Item as='a'>LinkedIn</List.Item>
                        </List>
                        </Grid.Column>
                        <Grid.Column width={7}>
                        <Header as='h4' inverted>
                            Vira
                        </Header>
                        <p>
                            Vira was created in March of 2021 as the capstone project for Phase 5 of Flatiron School's Software Engineering Program.
                        </p>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </>
    )
}

export default Footer
