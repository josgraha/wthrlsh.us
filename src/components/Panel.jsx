import React from 'react';

class Panel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{this.props.content}</div>
        );
    }
}

export default Panel;
