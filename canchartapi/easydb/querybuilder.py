from .dbbuilder import DBBuilder

class QueryBuilder(DBBuilder):
    def setup(self):
        self.onoffset = False
        self.__limit = None
        self.onwhere = False
        self.orederby = []

    def preexecute(self):
        if self.orederby:
            subquery = ', '.join(f'{field} {asc}' for field, asc, in self.orederby)
            self.query += ' ORDER BY ' + subquery
        if self.__limit:
            self.query += f" LIMIT {self.__limit}"

    def where(self, cond):
        if self.onwhere:
            raise Exception("only one where allowed")
        self.onwhere = True
        self.query += f" WHERE {cond}"
        return self

    def limit(self, limit):
        if self.__limit:
            raise Exception("only one limit allowed")
        self.__limit = limit
        return self
    
    def offset(self, offset):
        if self.onoffset:
            raise Exception("only one offset allowed")
        self.onoffset = True
        self.query += f" OFFSET {offset}"
        return self
    
    def orderby(self, field, descend = False):
        self.orederby.append((field, 'DESC' if descend else 'ASC'))
        return self