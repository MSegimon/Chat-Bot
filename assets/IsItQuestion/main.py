import pandas as pd
import time

# Other files
import core
import cosineSimilarity
import otherFunctions

# Main code
def isQuestion(text):
    # Establish connection
    core.connect()

    # Call server and get result
    questionsResult = core.run_read_query("SELECT text FROM chatbot WHERE isQuestion = 1")
    answersResult = core.run_read_query("SELECT text FROM chatbot WHERE isQuestion = 0")

    # Convert question and answer result to arrays
    questions = []
    answers = []
    for index, row in questionsResult.iterrows():
        questions.append(row['text'])

    for index, row in answersResult.iterrows():
        answers.append(row['text'])

    # Get the sum of cosine similarities
    questionsSum = 0.0
    answersSum = 0.0
    for string in questions:
        questionsSum += cosineSimilarity.cosineSimilarity(text, string)
    
    for string in answers:
        answersSum += cosineSimilarity.cosineSimilarity(text, string)

    # Getting means of both similarities
    questionsMean = questionsSum / len(questions)
    answersMean = answersSum / len(answers)

    # check if it is question
    threshold = 40  # I just found 40 to be a good threshold it might be changed with further training
    # The resone for the unknown option is so that manual sorting of text can happen in the begining stages
    if questionsMean > answersMean:
        if otherFunctions.percentageDiff(questionsMean, answersMean) <= threshold:
            print('Unknown')
            #core.run_insert_query("INSERT INTO chatbot(id, text, isQuestion, response, isWolframResponse, timestamp) VALUES (null,'" + text + "',2,'',0," + str(int(time.time())) + ")")
            return 2
        else:
            print('its a question')
            #core.run_insert_query("INSERT INTO chatbot(id, text, isQuestion, response, isWolframResponse, timestamp) VALUES (null,'" + text + "',1,'',0," + str(int(time.time())) + ")")
            return 1
    else:
        if otherFunctions.percentageDiff(answersMean, questionsMean) <= threshold:
            print('Unknown')
            #core.run_insert_query("INSERT INTO chatbot(id, text, isQuestion, response, isWolframResponse, timestamp) VALUES (null,'" + text + "',2,'',0," + str(int(time.time())) + ")")
            return 2
        else:
            print('it is not a question')
            #core.run_insert_query("INSERT INTO chatbot(id, text, isQuestion, response, isWolframResponse, timestamp) VALUES (null,'" + text + "',0,'',0," + str(int(time.time())) + ")")
            return 0

    # Disconnect from server
    core.disconnect()

isQuestion("what is the meaning of life")