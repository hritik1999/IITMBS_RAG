from flask_restful import Resource,Api, reqparse
from application.ai import QA
import json
from flask import jsonify


api = Api(prefix='/api')


class Query(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('question')
        args = parser.parse_args()
        
        try:
            result = QA(args['question'])
            citations = [doc.page_content for doc in result['context']]
            return {"answer": result['answer'], "citations": citations}
        except:
            return {"answer":"Sorry something went wrong! please try with another prompt."}
    
api.add_resource(Query, '/query')

