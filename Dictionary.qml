import QtQuick 2.0
import QtQuick.LocalStorage 2.0
import Ubuntu.Components 0.1
import Ubuntu.Components.ListItems 0.1 as ListItem
import "Script.js" as Script

Rectangle {
    id: root
    width: units.gu(35)
    height: units.gu(45)
    color: "white"

    Component.onCompleted: { Script.fetch("a") }

    /*Using qml property because changing js global variable's value is not persistent-
      between pages, this should be done with javascript variable property.*/
    property var defineWordid: 1111
    property var defineWord: "N/A"


    Column {
        id: pageLayout

        height: root.height //it should be childrenRect.height, but can't get it to work

        Row {
            TextField {
                id: tfSearch
                width: root.width - units.gu(12)
                height: units.gu(4)
                placeholderText: "Enter search term"
                onTextChanged: {
                    resultPage.title = "Results for: " + tfSearch.text;
                    //Show result page
                    pageStack.push(resultPage);
                    Script.fetch(tfSearch.text)
                }

                primaryItem: Button {
                    ItemStyle.class: "transparent-button"
                    iconSource: "search.png"
                    width: units.gu(2)
                }
            }

            Button {
                id: btnSearch
                anchors {
                    left: tfSearch.right
                    leftMargin: units.gu(.4)
                }
                width: root.width - tfSearch.width- units.gu(.6)
                text: "Search"
                color: "#c94212"
                onClicked: {
                    resultPage.title = "Results for: " + tfSearch.text;
                    //Show result page
                    pageStack.push(resultPage);
                    Script.fetch(tfSearch.text)
                }
            }
        }

        PageStack {
            id: pageStack
            anchors {
                top: parent.top
                topMargin: tfSearch.height
                bottom: parent.bottom
            }
            width: root.width

            Component.onCompleted: push(resultPage)
            Page {
                id: resultPage
                title: ""

            Flickable {
                id: flickable
                clip: true
                anchors.fill: parent
                contentHeight: pageLayout.height
                contentWidth: parent.width
                flickableDirection: Flickable.VerticalFlick
                    Column {
                        id: resultColumn
                        anchors.fill: parent
                        /*
                        ListItem.Standard {
                            text: i18n.tr("Page one")
                            onClicked: pageStack.push(page1)
                            progression: true
                        }
                        ListItem.Standard {
                            text: i18n.tr("Page two (external)")
                            onClicked: pageStack.push(Qt.resolvedUrl("MyCustomPage.qml"))
                            progression: true
                        }
                        */
                    }
                }//Flickable
            }
        }
    }
}
