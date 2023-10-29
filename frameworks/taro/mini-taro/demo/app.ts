import React from "react";

export default class AppComp extends React.Component {
  componentDidMount() {
    // ...
  }

  onLaunch(options: unknown) {
    console.warn('App onlaunch', options)
  }

  componentDidShow() {
    // ...
  }

  componentDidHide() {
    // ...
  }

  componentDidCatchError() {
    // ...
  }

  render() {
    return React.createElement('view', {}, this.props.children)
  }
}
