import React, { Component } from 'react';
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import MusicItem from "../components/musicItem";
import styles from './index.less';


@observer
@inject(store => store.music)
export default class Index extends Component {
  render() {
    const { list } = this.props;
    return (
      <div>
          {list.map(item => <MusicItem key={item.id} {...item} />)}
      </div>
    )
  }
}
