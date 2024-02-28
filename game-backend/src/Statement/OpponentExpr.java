package Statement;

import java.util.Map;

public class OpponentExpr implements Expr {
    @Override
    public void prettyPrint(StringBuilder s) {
        s.append("opponent");
    }

    @Override
    public int eval(Map<String, Integer> bindings) throws EvalError {
        return 0;
    }
}
