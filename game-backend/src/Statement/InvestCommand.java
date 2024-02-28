package Statement;

import java.util.Map;

public class InvestCommand implements Expr{
    private Expr expression;

    public InvestCommand(Expr expression) {
        this.expression = expression;
    }

    @Override
    public void prettyPrint(StringBuilder s) {
        expression.prettyPrint(s);
    }

    @Override
    public int eval(Map<String, Integer> bindings) throws EvalError {
        return 0;
    }
}
