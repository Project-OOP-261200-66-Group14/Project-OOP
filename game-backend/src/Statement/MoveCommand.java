package Statement;

import java.util.Map;

public class MoveCommand implements Expr{
    private Expr direction;

    public MoveCommand(Expr direction) {
        this.direction = direction;
    }

    @Override
    public void prettyPrint(StringBuilder s) {
        direction.prettyPrint(s);
    }

    @Override
    public int eval(Map<String, Integer> bindings) throws EvalError {
        return 0;
    }

}
