import { Grid, Icon, Accordion, Segment, Button  } from 'semantic-ui-react'
import { useState } from "react";

import _ from 'lodash'
import { IconButton } from '@material-ui/core';

function PracticeBuild() {

    const [ showAccordian, setShowAccordian ] = useState(false);
    const [ accordPanels, setAccordPanels ] = useState(0);
    const [ activeIndex, setActiveIndex ] = useState(0);


    const templates = [
        {
            name: "Yinyasa Flow",
            sections: {
                1: "Warm-Up",
                2: "Sun Salutations",
                3: "Standing Series",
                4: "Balancing",
                5: "Seated", 
                6: "Backbends",
                7: "Inversions",
                8: "Final Poses"
            }
        },
        {
            name: "Restorative Flow",
            sections: {
                1: "Warm-Up",
                2: "Sun Salutations",
                3: "Seated",
                4: "Forward Bends",
                5: "Neutralizers", 
                6: "Backbends",
                7: "Final Poses"
            }
        }
    ]

    // const columns = _.times(16, (i) => (
    //     <Grid.Column key={i}>
    //         <Icon name='certificate' />
    //     </Grid.Column>
    // ))

    function onAddCategory() {
        setAccordPanels((accordPanels) => accordPanels + 1)
        handleAddPanel();
    };

    function handleAddPanel() {
        console.log("Yo!");
    };

    console.log(accordPanels);
    return (
        <>
            <h1>Practice Build Line</h1>

            {/* <Grid>{columns}</Grid> */}
            
                <Icon onClick={onAddCategory} link name='plus square' size='big' />
                
                { showAccordian ?
                    <Segment secondary>
                        <div>activeIndex: {activeIndex}</div>
                        <input
                            type='range'
                            min='-1'
                            max={accordPanels.length - 1}
                            value={activeIndex}
                            onChange={this.handleSliderChange}
                        />
                    
                        <Accordion
                        activeIndex={activeIndex}
                        panels={accordPanels}
                        onTitleClick={this.handleTitleClick}
                        />

                    </Segment> :
                    null
                }
        </>
    );
};

export default PracticeBuild