package Statement;

import java.util.Map;

public class Direction implements Expr {
    private String direction;

    public Direction(String direction) {
        this.direction = direction;
    }

    @Override
    public void prettyPrint(StringBuilder s) {
        s.append(direction);
    }

    @Override
    public int eval(Map<String, Integer> bindings) throws EvalError {
        return 0;
    }
}
