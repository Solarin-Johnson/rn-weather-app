"use dom";

import WebView from "react-native-webview";

export default function DOMComponent({ name }) {
  console.log("Dom here");

  return <WebView source={{ html: "<h1>Hello, world!</h1>" }} />;
}
