package Statement;

import java.util.Map;

public class AssignmentStatement implements Expr{
    private String variable;
    private Expr expression;

    public AssignmentStatement(String variable, Expr expression) {
        this.variable = variable;
        this.expression = expression;
    }

    @Override
    public void prettyPrint(StringBuilder s) {
        s.append(variable);
        s.append("=");
        expression.prettyPrint(s);
    }

    @Override
    public int eval(Map<String, Integer> bindings) throws EvalError {
        int result = expression.eval(bindings);
        bindings.put(variable, result);
        return result;
    }
}
