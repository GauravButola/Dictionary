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
