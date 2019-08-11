import React from 'react';
import { AutoComplete, Input, Icon } from 'antd';
import { PROFILE_PIC_URL_PREFIX } from '../constants';
import nba from 'nba';

const Option = AutoComplete.Option;

window.nba = nba;

export class SearchBar extends React.Component {
    state = {
        dataSource: [],
    }

    handleSearch = (value) => {
        this.setState({
            dataSource: !value ? [] : nba.searchPlayers(value).map(
                ({ fullName, playerId }) => (
                    <Option key={playerId} value={fullName}>
                        <img
                            className="player-option-image"
                            src={`${PROFILE_PIC_URL_PREFIX}/${playerId}.png`}
                            alt={fullName}
                        />
                        <span className="player-option-label">{fullName}</span>
                    </Option>
                )
            )
        });
    }

    onSelect = (value, {key: playerId}) => {
        console.log('onSelect', value, playerId);
        this.props.loadPlayerInfo(playerId);
    }

    render() {
        const { dataSource } = this.state;
        return (
            <AutoComplete
                dataSource={dataSource}
                className="search-bar"
                size="large"
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="Search NBA Player"
                optionLabelProp="value"
            >
                <Input suffix={<Icon type="search" />} />
            </AutoComplete>
        );
    }
}