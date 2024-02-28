package Statement;

import java.util.Map;

interface Node {
    void prettyPrint(StringBuilder s);
}

public interface Expr extends Node {
    int eval(Map<String, Integer> bindings) throws EvalError;
}