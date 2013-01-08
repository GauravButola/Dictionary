/*
 * Copyright 2013 Gaurav Butola <GauravButola@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 */

function getDatabase() {
    return LocalStorage.openDatabaseSync("wordnet", "1.0", "description", 50000000);
}

var db = getDatabase()
function fetch(searchTerm) {
    /*Remove current results first*/
    for (var i = 0; i < resultColumn.children.length; ++i)
        resultColumn.children[i].destroy();


    db.transaction(
        function(tx) {

            var wordidQuery = 'SELECT * FROM word WHERE lemma LIKE ' + '"' + searchTerm + '%"' + ' LIMIT 50'
            var wordidResult = tx.executeSql(wordidQuery);

            for(var i = 0; i < wordidResult.rows.length; i++) {
                /*showResults(word, wordid)*/
                showResults(wordidResult.rows.item(i).lemma, wordidResult.rows.item(i).wordid)
            }
        }
    )
}

/*function to dynamically create and show returned results*/
function showResults(word, wordid) {
    var component = Qt.createComponent("Results.qml");
    var sprite = component.createObject(resultColumn, {resultText: word, resultWordid: wordid});

    if (sprite == null) {
        // Error Handling
        console.log("Error creating object");
    }
}

function getDefinition() {
    db.transaction(
        function(tx) {
            /*Get 'synsetid' from 'sense' table*/
            var synsetidQuery = 'SELECT synsetid FROM sense WHERE wordid=' + '"' + root.defineWordid + '"'
            var synsetidResult = tx.executeSql(synsetidQuery);
            for(var i = 0; i < synsetidResult.rows.length; i++) {
                var synsetid = synsetidResult.rows.item(i).synsetid

                /*Get 'definition' from 'synset' table*/
                var definitionQuery = 'SELECT definition FROM synset WHERE synsetid=' + '"' + synsetid + '"'
                var definitionResult = tx.executeSql(definitionQuery);
                showDefinition(definitionResult.rows.item(0).definition);
            }
        }
    )
}

/*function to dynamically create and show definition*/
function showDefinition(def) {
    var component = Qt.createComponent("DefinitionComponent.qml");
    var sprite = component.createObject(defColumn, {definition: def});

    if (sprite == null) {
        // Error Handling
        console.log("Error creating object");
    }
}
