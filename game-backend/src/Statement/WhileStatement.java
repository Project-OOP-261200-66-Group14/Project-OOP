package Statement;

import java.util.Map;

public class WhileStatement implements Expr {
    private Expr condition;
    private Expr thenClause;

    public WhileStatement(Expr condition, Expr thenClause) {
        this.condition = condition;
        this.thenClause = thenClause;
    }

    @Override
    public void prettyPrint(StringBuilder s) {
        s.append("while ");
        condition.prettyPrint(s);
        s.append(" ");
        thenClause.prettyPrint(s);
    }

    @Override
    public int eval(Map<String, Integer> bindings) throws EvalError {
        return 0;
    }
}
