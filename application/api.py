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
        result = QA(args['question'])
        citations = [doc.page_content for doc in result['context']]
        return {"answer": result['answer'], "citations": citations}
    
api.add_resource(Query, '/query')

