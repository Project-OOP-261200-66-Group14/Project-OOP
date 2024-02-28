package Statement;

import java.util.Map;

public class NearbyExpr implements Expr {
    private Expr direction;

    public NearbyExpr(Expr direction) {
        this.direction = direction;
    }

    @Override
    public void prettyPrint(StringBuilder s) {
        s.append("nearby");
        direction.prettyPrint(s);
    }

    @Override
    public int eval(Map<String, Integer> bindings) throws EvalError {
        return 0;
    }
}
