import React, { PureComponent } from 'react';
import { Option } from 'binary-components';

export default class SecretQuestion extends PureComponent {
    props: {
        onChange: (e: SyntheticEvent) => void,
    };

    render() {
        const { onChange } = this.props;
        return (
            <select name="secretquestion" onChange={onChange}>
                <Option value="" text="Secret question" />
                <Option
                    value="Mother's maiden name"
                    text="Mother's maiden name"
                />
                <Option value="Name of your pet" text="Name of your pet" />
                <Option value="Name of first love" text="Name of first love" />
                <Option
                    value="Memorable town/city"
                    text="Memorable town/city"
                />
                <Option value="Memorable date" text="Memorable date" />
                <Option value="Favourite dish" text="Favourite dish" />
                <Option value="Brand of first car" text="Brand of first car" />
                <Option value="Favourite artist" text="Favourite artist" />
            </select>
        );
    }
}
