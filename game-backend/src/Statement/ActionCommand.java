package Statement;

import java.util.Map;

public class ActionCommand implements Expr {
    private ActionType type;

    public ActionCommand(ActionType type) {
        this.type = type;
    }

    @Override
    public void prettyPrint(StringBuilder s) {
        s.append(type.toString().toLowerCase());
    }

    @Override
    public int eval(Map<String, Integer> bindings) throws EvalError {
        System.out.println("Evaluating " + type.toString().toLowerCase() + " command");
        return 0;
    }
}