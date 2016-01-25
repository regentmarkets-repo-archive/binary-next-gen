import React, { PropTypes, Component } from 'react';
import InputGroup from './InputGroup';

export default class SearchFilterBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredRows: props.rows,
        };
    }

    static propTypes = {
        rows: PropTypes.array.isRequired,    // need to support table structure, 2d array is expected
        searchString: PropTypes.string,
        onQueryChange: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,   // takes 1 argument which is index of row selected
    };

    filter(searchString) {
        const { rows } = this.props;
        const filteredRows = rows.filter(row => {
            return row.join().indexOf(searchString) !== -1;
        });
        this.setState({ filteredRows });
    }

    onQueryChange(e) {
        const val = e.target.value;
        this.props.onQueryChange(val);
        this.filter(val);
    }

    render() {
        const { searchString, onSelect } = this.props;
        const { filteredRows } = this.state;
        return (
            <div>
                <InputGroup autoFocus type="text" placeholder="Keyword to search" value={searchString} onChange={::this.onQueryChange} />
                <table>
                    <tbody>
                        {
                            filteredRows.map((row, rowIdx) => {
                                return (
                                    <tr key={rowIdx} onClick={() => onSelect(rowIdx)}>
                                        {row.map((ele, colIdx) => <td key={colIdx}>{ele}</td>)}
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
