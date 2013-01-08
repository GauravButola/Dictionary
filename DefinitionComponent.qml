import QtQuick 2.0
import QtQuick.LocalStorage 2.0
import Ubuntu.Components 0.1
import "Script.js" as Script

Label {
    width: root.width
    wrapMode: Text.WordWrap
    property string definition
    text: "• " + definition + "\n"
}
