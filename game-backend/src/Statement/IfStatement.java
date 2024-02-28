package Statement;

import java.util.Map;

public class IfStatement implements Expr {
    private Expr condition;
    private Expr thenClause;
    private Expr elseClause;

    public IfStatement(Expr condition, Expr thenClause, Expr elseClause) {
        this.condition = condition;
        this.thenClause = thenClause;
        this.elseClause = elseClause;
    }

    @Override
    public void prettyPrint(StringBuilder s) {
        s.append("if");
        condition.prettyPrint(s);
        s.append("then");
        thenClause.prettyPrint(s);
        s.append("else");
        elseClause.prettyPrint(s);
    }

    @Override
    public int eval(Map<String, Integer> bindings) throws EvalError {
        return 0;
    }
}
