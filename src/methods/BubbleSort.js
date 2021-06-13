import React from 'react';

const BubbleSort = (props) => {
    const [array, setArray] = React.useState(props.generateArray);
    const [running, setRunning] = React.useState(false);
    const [animations, setAnimations] = React.useState([]);

    // animate the DOM
    const displayBubbleSort = () => {
        // set the flag to disable the button
        setRunning(true);
        console.log(animations);

        // get the numbers on the DOM for animating
        let values = Array.from(document.getElementsByClassName('value'));
        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                let color = 'transparent';
                let items = [];
                items.push(values.find(item => item.dataset.key === animations[i][1].key.toString()));
                items.push(values.find(item => item.dataset.key === animations[i][2].key.toString()));
                switch (animations[i][0]) {
                    case 'compare':
                        color = 'yellow';
                        break;
                    case 'swap':
                        color = 'red';
                        setTimeout(() => {
                            items[0].parentNode.insertBefore(items[0], items[1]);
                        }, props.timeout / 2);
                        break;
                    case 'confirm':
                        color = 'blue';
                        break;
                    default: 
                        break;
                }
                items[0].style.backgroundColor = color;
                items[1].style.backgroundColor = color;

                // reset the flag
                if (i === animations.length - 1) {
                    setRunning(false);
                }
            }, i * props.timeout);
        }
    }

    // simple swap function
    function swap(arr, a, b) {
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }

    // complete the sort and return animation steps
    const handleBubbleSort = () => {
        // update the array to include keys
        let arr = array.map((value, key) => {
            return {
                'key': key,
                'value': value
            }
        });
        // sort and push to the animation state
        let steps = [];
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                    steps.push(['compare', arr[j], arr[j + 1]]);
                    if (arr[j].value > arr[j+1].value) {
                        swap(arr, j, j + 1);
                        steps.push(['swap', arr[j], arr[j + 1]]);
                    }
                    steps.push(['confirm', arr[j], arr[j + 1]]);
            }
        }
        setAnimations(steps);
    }

    // sort new arrays
    React.useEffect(() => {
        handleBubbleSort();
    }, [array]);

    // animate new sorts
    React.useEffect(() => {
        setTimeout(() => {
            displayBubbleSort();
        }, props.timeout * 4);
    }, [animations]);

    return (
        <div>
            <h1>Bubble Sort</h1>
            <div className="sort-container">
                {array.map((value, i) => (
                    <div className={`value`} key={i} data-key={i} style={{ height: value + 'vh' }}>
                        {value}
                    </div>
                ))}
            </div>
            {/* <button onClick={() => {setArray(props.generateArray)}} disabled={running}>Reset Sort</button> */}
        </div>
    )
}

export default BubbleSort;