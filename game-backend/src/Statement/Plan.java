package Statement;

import java.util.List;
import java.util.Map;

public class Plan implements Expr{
    private List<Expr> statements;

    public Plan(List<Expr> statements) {
        this.statements = statements;
    }

    @Override
    public void prettyPrint(StringBuilder s) {
        for (Expr statement : statements) {
            statement.prettyPrint(s);
        }
    }

    @Override
    public int eval(Map<String, Integer> bindings) throws EvalError {
        return 0;
    }
}
