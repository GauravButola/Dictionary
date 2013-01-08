import QtQuick 2.0
import QtQuick.LocalStorage 2.0
import Ubuntu.Components 0.1
import "Script.js" as Script

Page {
    id: defPage
    title: "Back"

    Flickable {
        id: flickable
        clip: true
        anchors.fill: parent
        contentHeight: defColumn.height
        contentWidth: parent.width
        flickableDirection: Flickable.VerticalFlick

        Rectangle {
            Component.onCompleted: {
                Script.getDefinition();
                lblWord.text = root.defineWord
            }
            Column {
                id: defColumn
                Label {
                    id: lblWord
                    text: "N/A"
                    font {
                        pixelSize: 16
                        bold: true
                    }
                }
            }
        }
    }
}
