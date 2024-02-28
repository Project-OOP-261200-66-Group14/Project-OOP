package Statement;

import java.util.Map;

public class AttackCommand implements Expr{
    private Expr direction;
    private Expr expression;

    public AttackCommand(Expr direction, Expr expression) {
        this.direction = direction;
        this.expression = expression;
    }

    @Override
    public void prettyPrint(StringBuilder s) {
        s.append("shoot ");
        direction.prettyPrint(s);
        s.append(" ");
        expression.prettyPrint(s);
    }

    @Override
    public int eval(Map<String, Integer> bindings) throws EvalError {
        return 0;
    }
}
