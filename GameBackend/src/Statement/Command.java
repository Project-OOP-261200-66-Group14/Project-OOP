package Statement;

import java.util.Map;

public class Command implements Expr{
    private Expr commandExpression;

    public Command(Expr commandExpression) {
        this.commandExpression = commandExpression;
    }

    @Override
    public void prettyPrint(StringBuilder s) {
        commandExpression.prettyPrint(s);
    }

    @Override
    public int eval(Map<String, Integer> bindings) throws EvalError {
        return commandExpression.eval(bindings);
    }
}
