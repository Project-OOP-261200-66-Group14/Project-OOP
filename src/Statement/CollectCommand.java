package Statement;

import java.util.Map;

public class CollectCommand implements Expr{
    private Expr expression;

    public CollectCommand(Expr expression) {
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
