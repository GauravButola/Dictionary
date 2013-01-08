import QtQuick 2.0
import QtQuick.LocalStorage 2.0
import Ubuntu.Components 0.1
import Ubuntu.Components.ListItems 0.1 as ListItem
import "Script.js" as Script


ListItem.Standard {
    id: result
    height: units.gu(4)
    property alias resultText: result.text
    property string resultWordid
    text: "N/A"
    onClicked: {
        root.defineWordid = resultWordid;
        root.defineWord = resultText;
        pageStack.push(Qt.resolvedUrl("Definition.qml"))
    }
    progression: true
}
