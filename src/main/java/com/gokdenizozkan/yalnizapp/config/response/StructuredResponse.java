package com.gokdenizozkan.yalnizapp.config.response;

public record StructuredResponse(
        String message,
        ResponseStatus status,
        Object data
){}
