from flask_restful import Resource,Api, reqparse
from application.ai import query,QA

api = Api(prefix='/api')


class Query(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('question')
        args = parser.parse_args()
        result = QA(args['question'])
        return result
    
api.add_resource(Query, '/query')

